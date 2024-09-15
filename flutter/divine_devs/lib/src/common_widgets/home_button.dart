import 'package:divine_devs/src/utils/colors_sys.dart';
import 'package:flutter/material.dart';

class HomeButton extends StatelessWidget {
  const HomeButton(
      {super.key,
      required this.name,
      this.onPressed,
      required this.color,
      required this.logo,
      this.logoColor = false});

  final String name;
  final Color color;
  final bool? logoColor;
  final String logo;
  final VoidCallback? onPressed;
  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: onPressed,
      style: ButtonStyle(
        shape: MaterialStatePropertyAll(
          RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16.0),
              side: BorderSide(
                color: ColorSys.kgrey,
                width: 2.0,
              )),
        ),
        minimumSize: const MaterialStatePropertyAll(Size.fromHeight(40)),
        padding: const MaterialStatePropertyAll(EdgeInsets.all(16.0)),
        backgroundColor: MaterialStatePropertyAll<Color>(color),
      ),
      label: Text(
        name,
        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            color: logoColor == true
                ? Theme.of(context).canvasColor
                : Theme.of(context).textTheme.bodyMedium?.color,
            fontWeight: FontWeight.bold),
      ),
      icon: Padding(
        padding: const EdgeInsets.only(right: 16.0),
        child: Image.asset(
          logo,
          color: Colors.white,
          height: 30.0,
          width: 30.0,
        ),
      ),
    );
  }
}
