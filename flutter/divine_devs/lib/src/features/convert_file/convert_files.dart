import 'dart:io';
import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:divine_devs/src/common_widgets/custom_dropdown.dart';
import 'package:divine_devs/src/common_widgets/home_button.dart';
import 'package:divine_devs/src/common_widgets/theme_button.dart';
import 'package:divine_devs/src/utils/colors_sys.dart';
import 'package:path_provider/path_provider.dart';

class ConvertFilePage extends StatefulWidget {
  @override
  _ConvertFilePageState createState() => _ConvertFilePageState();
}

class _ConvertFilePageState extends State<ConvertFilePage> {
  final _formats = ['JSON', 'CSV'];
  String _selectedFormat = 'JSON';
  File? _file;
  final Dio _dio = Dio();

  Future<void> _pickFile() async {
    final result = await FilePicker.platform.pickFiles();

    if (result != null) {
      setState(() {
        _file = File(result.files.single.path!);
      });
    }
  }

  Future<void> _convertFile() async {
    if (_file == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Please upload a file")),
      );
      return;
    }

    final formData = FormData.fromMap({
      'file': MultipartFile.fromFileSync(_file!.path),
      'input_file_type': 'application/json',
    });

    try {
      final response = await _dio.post(
        'http://localhost:5001/api/ml/v1/convert',
        data: formData,
        options: Options(
          responseType: ResponseType.plain,
        ),
      );

      if (response.statusCode == 200) {
        final directory = await getApplicationDocumentsDirectory();
        final filePath = '${directory.path}/converted_file.json';

        final file = File(filePath);
        await file.writeAsString(response.data);

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("File converted and saved successfully")),
        );
      } else {
        throw Exception('Failed to convert file');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error: $e")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Convert Files'),
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
                  "Simplify Your Document Workflow",
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
                  "Upload your files, extract valuable data, and interact with it in real time. Choose an option below to get started:",
                  textAlign: TextAlign.center,
                  style: Theme.of(context)
                      .textTheme
                      .bodySmall
                      ?.copyWith(color: ColorSys.kwhite.withOpacity(0.5)),
                ),
              ],
            ),
            const SizedBox(
              height: 30.0,
            ),
            Row(
              children: [
                Expanded(
                  flex: 2,
                  child: SizedBox(
                    width: 200.0,
                    child: HomeButton(
                      name: "Upload file",
                      color: ColorSys.ksecondary,
                      logo: "assets/icons/convert_file.png",
                      onPressed: _pickFile,
                    ),
                  ),
                ),
                const SizedBox(
                  width: 20.0,
                ),
                Flexible(
                  flex: 1,
                  child: SizedBox(
                    width: 100,
                    child: CustomDropdown(
                      items: _formats,
                      hintText: 'Select',
                      selectedItem: _selectedFormat,
                      onChanged: (value) {
                        setState(() {
                          _selectedFormat = value!;
                        });
                      },
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(
              height: 20.0,
            ),
            ThemeButton(
              name: "Convert File",
              textColor: ColorSys.kwhite,
              buttonColor: ColorSys.ksecondary,
              onPressed: _convertFile,
            ),
          ],
        ),
      ),
    );
  }
}
