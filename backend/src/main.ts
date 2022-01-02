import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import { swaggerSetup } from "./utils/swagger.setup";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = "/api";
  app.setGlobalPrefix(prefix);
  app.enableCors({
    allowedHeaders: "Content-Type",
    methods: "POST,GET,PUT,PATCH,DELETE,OPTIONS",
    credentials: true,
    origin: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(cookieParser());
  swaggerSetup(app, prefix);
  await app.listen(process.env.PORT);
}
bootstrap();
