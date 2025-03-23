export function success (data, msg) {
  return {
    code: 200,
    data,
    msg
  }
}

export function error (msg) {
  return {
    code: 500,
    msg
  }
}