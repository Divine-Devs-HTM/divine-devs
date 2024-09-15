import 'package:dio/dio.dart';

class ChatService {
  final Dio _dio = Dio();
  final int _documentId;

  ChatService(this._documentId);

  Future<String> sendMessage(
      String currentMessage, List<String> chatHistory) async {
    try {
      final response = await _dio.post(
        'http://localhost:5001/api/ml/v1/chat',
        data: {
          'chat_history': chatHistory,
          'current_message': currentMessage,
          'document_id': _documentId,
        },
        options: Options(contentType: 'application/json'),
      );

      if (response.statusCode == 200) {
        return response.data['chat_response'] as String;
      } else {
        throw Exception('Failed to get response from LLM');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }
}
