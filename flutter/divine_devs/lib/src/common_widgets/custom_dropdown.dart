import 'package:flutter/material.dart';
import 'package:divine_devs/src/utils/colors_sys.dart';

class CustomDropdown extends StatelessWidget {
  const CustomDropdown({
    super.key,
    required this.items,
    required this.hintText,
    this.onChanged,
    required this.selectedItem,
  });

  final List<String> items;
  final String hintText;
  final String selectedItem;
  final ValueChanged<String?>? onChanged;

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<String>(
      value: selectedItem.isNotEmpty ? selectedItem : null,
      decoration: InputDecoration(
        contentPadding:
            const EdgeInsets.all(8.0), // Smaller padding for a compact dropdown
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16.0),
          borderSide: BorderSide(
            color: ColorSys.ksecondary,
            width: 2.0,
          ),
        ),
        filled: true,
        fillColor: ColorSys.kgrey,
      ),
      items: items.map<DropdownMenuItem<String>>((String value) {
        return DropdownMenuItem<String>(
          value: value,
          child: Text(
            value,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: ColorSys.kblack,
                ),
          ),
        );
      }).toList(),
      onChanged: onChanged,
      hint: Text(
        hintText,
        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: ColorSys.kblack,
            ),
      ),
    );
  }
}
