// apiClients/tokenRefreshHelper.ts

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    console.log("Requesting token refresh");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;

    const response = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({refresh: refreshToken}), // Include the refresh token in the request body
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      return data;
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    console.error('Token refresh error:', error);

    return null;
  }
};
