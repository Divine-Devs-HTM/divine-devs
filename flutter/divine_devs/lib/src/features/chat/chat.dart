import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:divine_devs/src/utils/colors_sys.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:flutter_chat_types/flutter_chat_types.dart' as types;
import 'package:flutter_chat_ui/flutter_chat_ui.dart';
import 'package:http/http.dart' as http;
import 'package:intl/date_symbol_data_local.dart';
import 'package:mime/mime.dart';
import 'package:path_provider/path_provider.dart';
import 'package:uuid/uuid.dart';
import 'package:open_filex/open_filex.dart';

class ChatPage extends StatefulWidget {
  const ChatPage({super.key});

  @override
  State<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  var uuid = Uuid();
  int? _fileId; // File ID after successful upload

  List<types.Message> _messages = [];
  final _user = const types.User(
    id: '82091008-a484-4a89-ae75-a22bf8d6f3ac',
  );
  final _client = http.Client(); // Http client for API requests

  @override
  void initState() {
    super.initState();
    _loadMessages();
  }

  void _addMessage(types.Message message) {
    setState(() {
      _messages.insert(0, message);
    });
  }

  void _handleAttachmentPressed() {
    showModalBottomSheet<void>(
      context: context,
      builder: (BuildContext context) => SafeArea(
        child: SizedBox(
          height: 144,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              TextButton(
                onPressed: () {},
                child: const Align(
                  alignment: AlignmentDirectional.centerStart,
                  child: Text('Photo'),
                ),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pop(context);
                  _handleFileSelection();
                },
                child: const Align(
                  alignment: AlignmentDirectional.centerStart,
                  child: Text('File'),
                ),
              ),
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Align(
                  alignment: AlignmentDirectional.centerStart,
                  child: Text('Cancel'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _handleFileSelection() async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.any,
    );

    if (result != null && result.files.single.path != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Uploading file...")),
      );

      try {
        final file = File(result.files.single.path!);
        final formData = FormData.fromMap({
          'file': MultipartFile.fromFileSync(file.path),
        });

        final dio = Dio();
        final response = await dio.post(
          'http://localhost:5001/api/ml/v1/upload',
          data: formData,
        );

        if (response.statusCode == 200) {
          final fileId = response.data['file_id'];
          setState(() {
            _fileId = fileId;
          });

          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text("File uploaded successfully")),
          );

          final message = types.FileMessage(
            author: _user,
            createdAt: DateTime.now().millisecondsSinceEpoch,
            id: const Uuid().v4(),
            mimeType: lookupMimeType(file.path),
            name: result.files.single.name,
            size: result.files.single.size,
            uri: file.path,
          );

          _addMessage(message);
        } else {
          throw Exception('Failed to upload file');
        }
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Error: $e")),
        );
      }
    }
  }

  Future<void> _handleSendPressed(types.PartialText message) async {
    if (_fileId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Please upload a file before chatting")),
      );
      return;
    }

    final textMessage = types.TextMessage(
      author: _user,
      createdAt: DateTime.now().millisecondsSinceEpoch,
      id: const Uuid().v4(),
      text: message.text,
    );

    _addMessage(textMessage);

    try {
      final response = await _client.post(
        Uri.parse('http://localhost:5001/api/ml/v1/chat'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'current_message': message.text,
          'document_id': _fileId,
        }),
      );

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        final chatResponse = responseData['chat_response'] as String;

        final responseMessage = types.TextMessage(
          author: const types.User(id: 'llm'),
          createdAt: DateTime.now().millisecondsSinceEpoch,
          id: const Uuid().v4(),
          text: chatResponse,
        );

        _addMessage(responseMessage);
      } else {
        throw Exception('Failed to get response from LLM');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error: $e")),
      );
    }
  }

  void _loadMessages() async {
    final response = await rootBundle.loadString('assets/messages.json');
    final messages = (jsonDecode(response) as List)
        .map((e) => types.Message.fromJson(e as Map<String, dynamic>))
        .toList();

    setState(() {
      _messages = messages;
    });
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          foregroundColor: ColorSys.kblack,
          backgroundColor: Colors.white,
        ),
        body: Container(
          color: ColorSys.kprimary,
          child: Chat(
            messages: _messages,
            onAttachmentPressed: _handleAttachmentPressed,
            onSendPressed: _handleSendPressed,
            showUserAvatars: true,
            showUserNames: true,
            user: _user,
          ),
        ),
      );
}
