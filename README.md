# Spotify Clone - React Native

A Spotify Clone built using React Native and Spotify Web API, featuring authentication, home screen, search functionality, library management and Profile, liked songs, and basic UI enhancements.

## Features

1. Authentication via Spotify OAuth
2. Home Screen with search screen, library screen and profile screen.
3. Search Functionality (Albums, Tracks, Playlists, and Artists)
4. Top Artist page with detailed information
5. Library Management
6. Liked Songs

## Tech Stack

1. Spotify Web API
2. React Native (Expo)
3. Axios (API Requests)

And also try to improve it.

## Features Implemented in Different Branches

Below are the features implemented in separate branches:

- **Dynamic Localization Based on User Device Settings in a React Native Spotify Clone** → [Dynamic Localization](./React_Native_Task1.pdf)
- **Universal Links for Song Sharing in Spotify Clone** → [Song Sharing](./ReactNative-Task2.pdf)
- **App Icons and Splash Screen** → [App Icons and Splash Screen](./ReactNative-Task3.pdf)

## Developer Notes

To integrate Spotify API into your project, ensure the following:

1. **Environment Variables**: Use the provided `CLIENT_ID`, `CLIENT_SECRET`, `AUTHORIZATION_ENDPOINT`, `TOKEN_ENDPOINT`, `BASE_URL`, and `REDIRECT_URI` securely. Avoid hardcoding these values in your source code. Instead, use environment files or secure storage solutions.

2. **Authentication Flow**: Implement the OAuth 2.0 authorization code flow to authenticate users. Redirect users to the `AUTHORIZATION_ENDPOINT` and exchange the authorization code for an access token at the `TOKEN_ENDPOINT`.

3. **API Requests**: Use the `BASE_URL` to make requests to Spotify's Web API. Ensure you include the access token in the `Authorization` header as `Bearer <access_token>`.

4. **Redirect URI**: The `REDIRECT_URI` must match the one registered in your Spotify Developer Dashboard. Ensure it is correctly configured in your app.

5. **Error Handling**: Handle API errors gracefully, such as token expiration or invalid requests, and provide appropriate feedback to users.

6. **Security**: Never expose sensitive credentials like `CLIENT_SECRET` in the client-side code. Use a backend server to handle sensitive operations if needed.

For more details, refer to the [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/).
