import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream, existsSync } from "fs";
import { Upload } from "../types";
import path from "path";
import { v4 as uuidv4 } from "uuid";

@Resolver()
export class FileResolver {
  @Mutation(() => Boolean)
  async addFile(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: Upload
  ): Promise<boolean> {
    let realFilename = filename;
    while (existsSync(path.join(__dirname, `/../../files/${realFilename}`))) {
      realFilename = uuidv4().toString() + filename;
    }
    return new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../files/${realFilename}`))
        .on("finish", () => resolve(true))
        .on("error", (error) => {
          console.log(error);
          reject(false);
        });
    });
  }
}
