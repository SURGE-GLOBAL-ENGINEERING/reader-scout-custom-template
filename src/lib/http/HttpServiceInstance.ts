import { HttpService } from "./HttpService";

export class HttpServiceInstance {
  private static instance: HttpService;

  public static getInstance(): HttpService {
    if (!HttpServiceInstance.instance) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const domain = process.env.NEXT_PUBLIC_DOMAIN;

      if (!apiUrl || !domain) {
        throw new Error(
          "API_URL and DOMAIN environment variables are required"
        );
      }

      HttpServiceInstance.instance = new HttpService(apiUrl, domain);
    }
    return HttpServiceInstance.instance;
  }

  public static setInstance(instance: HttpService): void {
    HttpServiceInstance.instance = instance;
  }
}
