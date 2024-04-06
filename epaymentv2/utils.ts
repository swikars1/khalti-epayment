export async function awTry<T>(promise: unknown) {
  try {
    const data = await promise;
    return [data, null] as [T, never];
  } catch (err) {
    console.error(err);
    return [null, err] as [never, unknown];
  }
}
