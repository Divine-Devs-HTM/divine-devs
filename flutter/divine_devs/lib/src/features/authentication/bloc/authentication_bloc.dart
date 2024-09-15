import 'dart:convert';
import 'dart:io';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;

part 'authentication_event.dart';
part 'authentication_state.dart';

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  AuthenticationBloc() : super(AuthInitial()) {
    on<AuthLoginRequested>((event, emit) => _authLoginRequested(event, emit));
    on<AuthRegisterRequested>(
        (event, emit) => _authRegisterRequested(event, emit));
  }

  void _authLoginRequested(event, emit) async {
    try {
      emit(AuthLoading());
      final response =
          await http.get(Uri.parse('http://localhost:9000/api/v1/auth/login'));

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        if (data['success']) {
          emit(AuthSuccess(uid: data['userId']));
        } else {
          emit(AuthFailure("User not logged in."));
        }
      } else {
        emit(AuthFailure("Failed to check login status."));
      }
    } catch (e) {
      emit(AuthFailure("Authentication Failed!"));
    }
  }

  void _authRegisterRequested(event, emit) async {
    try {
      emit(AuthLoading());
      final String username = event.username;
      final String email = event.email;
      final String password = event.password;

      final response = await http.post(
        Uri.parse('http://localhost:9000/api/v1/auth/register'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'username': username,
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        if (data['success']) {
          emit(AuthSuccess(uid: data['userId']));
        } else {
          emit(AuthFailure(data['message'] ?? "Unable to register user!"));
        }
      } else {
        emit(AuthFailure("Failed to register user!"));
      }
    } catch (e) {
      emit(AuthFailure("Unable to register user!"));
    }
  }
}
