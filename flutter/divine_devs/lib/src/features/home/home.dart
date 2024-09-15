import 'package:divine_devs/src/common_widgets/home_button.dart';
import 'package:divine_devs/src/features/chat/chat.dart';
import 'package:divine_devs/src/features/convert_file/convert_files.dart';
import 'package:divine_devs/src/features/download_files/download_files.dart';
import 'package:divine_devs/src/utils/colors_sys.dart';
import 'package:flutter/material.dart';
import 'package:flutter_chat_ui/flutter_chat_ui.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
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
                  height: 10.0,
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
              height: 50.0,
            ),
            Column(
              children: [
                HomeButton(
                  name: "Chat with bot",
                  color: ColorSys.ksecondary,
                  logo: "assets/icons/chatbot.png",
                  onPressed: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ChatPage(),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 20.0,
                ),
                HomeButton(
                  name: "Download a file",
                  color: ColorSys.ksecondary,
                  logo: "assets/icons/file.png",
                  onPressed: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => DownloadFilePage(),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 20.0,
                ),
                HomeButton(
                  name: "Convert a file",
                  color: ColorSys.ksecondary,
                  logo: "assets/icons/convert_file.png",
                  onPressed: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ConvertFilePage(),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
