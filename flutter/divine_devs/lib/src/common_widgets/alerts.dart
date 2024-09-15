import 'package:flutter/material.dart';

void showAlert(
    BuildContext context, String message, String description, String type) {
  Color backgroundColor;

  if (type == "success") {
    backgroundColor = Colors.green;
  } else if (type == "error") {
    backgroundColor = Colors.red;
  } else if (type == "warning") {
    backgroundColor = Colors.orange;
  } else if (type == "info") {
    backgroundColor = Colors.blue;
  } else if (type == "delete") {
    backgroundColor = Colors.grey;
  } else {
    backgroundColor = Colors.black;
  }

  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(message, style: TextStyle(fontWeight: FontWeight.bold)),
          Text(description),
        ],
      ),
      backgroundColor: backgroundColor,
      duration: Duration(seconds: 3),
    ),
  );
}
