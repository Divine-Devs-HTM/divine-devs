part of 'authentication_bloc.dart';

sealed class AuthenticationEvent {}

final class AuthLoginRequested extends AuthenticationEvent {
  final String email;
  final String password;

  AuthLoginRequested({required this.email, required this.password});
}

final class AuthRegisterRequested extends AuthenticationEvent {
  final String username;
  final String email;
  final String password;

  AuthRegisterRequested(
      {required this.username, required this.email, required this.password});
}
