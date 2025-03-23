import { TextLineStream } from "@std/streams";

export async function* readlines(filename: string): AsyncGenerator<string> {
  using f = await Deno.open(filename);

  const readable = f.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());

  for await (const line of readable) {
    yield line;
  }
}
