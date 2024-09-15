import 'dart:io';
import 'package:divine_devs/src/common_widgets/alerts.dart';
import 'package:divine_devs/src/common_widgets/theme_button.dart';
import 'package:divine_devs/src/common_widgets/theme_textfield.dart';
import 'package:divine_devs/src/utils/colors_sys.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';

class DownloadFilePage extends StatefulWidget {
  const DownloadFilePage({super.key});

  @override
  _DownloadFilePageState createState() => _DownloadFilePageState();
}

class _DownloadFilePageState extends State<DownloadFilePage> {
  final TextEditingController _fileIdController = TextEditingController();
  bool _isLoading = false;
  String _statusMessage = '';

  Future<void> _downloadFile() async {
    final fileId = _fileIdController.text.trim();
    if (fileId.isEmpty) {
      showAlert(context, 'success', 'Please enter a file ID', '');
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      final response = await http.get(
        Uri.parse('http://localhost:5001/api/ml/v1/download/$fileId'),
        headers: {
          'Accept': 'application/octet-stream',
        },
      );

      if (response.statusCode == 200) {
        final directory = await getApplicationDocumentsDirectory();
        final filePath = '${directory.path}/file_$fileId';
        final file = File(filePath);
        await file.writeAsBytes(response.bodyBytes);
        showAlert(context, 'success', 'File downloaded successfully', '');
        setState(() {
          _statusMessage = 'File downloaded successfully: $filePath';
        });
      } else {
        showAlert(context, 'error', 'Failed to download file', '');
        setState(() {
          _statusMessage = 'Failed to download file';
        });
      }
    } catch (e) {
      showAlert(context, 'error', 'Error: $e', '');
      setState(() {
        _statusMessage = 'Error: $e';
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Download File'),
        foregroundColor: ColorSys.kwhite,
        backgroundColor: Colors.transparent,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const SizedBox(
              height: 50.0,
            ),
            Column(
              children: [
                Text(
                  "Download Your Files",
                  textAlign: TextAlign.center,
                  style: Theme.of(context)
                      .textTheme
                      .bodyLarge
                      ?.copyWith(fontSize: 28.0),
                ),
                const SizedBox(
                  height: 20.0,
                ),
                Text(
                  "Easily download files from the server by providing their unique ID. Enter the file ID, and let us handle the rest.",
                  textAlign: TextAlign.center,
                  style: Theme.of(context)
                      .textTheme
                      .bodySmall
                      ?.copyWith(color: ColorSys.kwhite.withOpacity(0.5)),
                ),
              ],
            ),
            const SizedBox(height: 20.0),
            ThemeTextField(
              fieldName: "Enter File Number",
              controllerName: _fileIdController,
              keyboardType: TextInputType.number,
              passwordField: false,
            ),
            const SizedBox(height: 20.0),
            ThemeButton(
              name: "Download File",
              onPressed: () async {
                _downloadFile();
              },
            ),
            const SizedBox(height: 20.0),
            Text(
              _statusMessage,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
