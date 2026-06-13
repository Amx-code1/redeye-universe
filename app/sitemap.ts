import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    "https://your-domain.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/universe`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/chapters`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/characters`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
    },
  ];
}