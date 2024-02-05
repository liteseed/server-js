export function evaluate({ target, data }:{target: string, data: string | Record<string, string>}) {
  return {
    Target: target,
    Tags: [
      { name: "Action", value: "Eval" }
    ],
    Data: data
  }
}

