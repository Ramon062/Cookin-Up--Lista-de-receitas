import type ICategoria from "@/interfaces/ICategoria";
import type IReceita from "@/interfaces/IReceitas";

async function obterDadosURL<T>(url: string): Promise<T> {
  // Encapsula o URL em AllOrigins para contornar o CORS
  const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(url);

  const resposta = await fetch(proxyUrl);
  if (!resposta.ok) throw new Error("Erro ao buscar dados via proxy");

  const dadosProxy = await resposta.json() as { contents: string };
  return JSON.parse(dadosProxy.contents) as T;
}

export async function obterCategorias() {
  return obterDadosURL<ICategoria[]>(
    "https://gist.githubusercontent.com/antonio-evaldo/002ad55e1cf01ef3fc6ee4feb9152964/raw/86802bed06855cdccc9247dd1fa175c6ccea7dda/categorias.json"
  );
}

export async function obterReceitas() {
  return obterDadosURL<IReceita[]>(
    "https://gist.githubusercontent.com/Ramon062/7c29ec8763f6269a8c37c16838f326f3/raw/416cdb03aaa983f23155ac0e6591112980fe3729/receitas.json"
  );
}
