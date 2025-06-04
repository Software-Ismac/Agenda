export class UserRepository {
  private baseUrl = "/v1/user";
  private authToken = "";

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.authToken}`,
    };
  }

  async create(userData: User): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Create failed: ${error}`);
    }

    return response.json();
  }

  async update(userData: User): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Update failed: ${error}`);
    }

    return response.json();
  }
}
export const userRepository = new UserRepository();
