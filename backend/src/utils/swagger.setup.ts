import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function swaggerSetup(app: INestApplication, prefix: string): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Humans of 42 API-Docs")
    .setVersion("0.1")
    .setDescription("Humans of 42 API 문서입니다")
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${prefix}/api-docs`, app, swaggerDocument, {
    customSiteTitle: "Humans of 42 API",
    swaggerOptions: { dafaultModelExpandDepth: -1 },
  });
}
