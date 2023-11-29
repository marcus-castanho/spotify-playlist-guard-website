type JestToErrorArg = Parameters<
    jest.Matchers<unknown, () => unknown>['toThrow']
>[0];

/**
 * Use when assertion expect .toThrow logged error can be ignored
 */
export function expectToThrowWithSilentLogs(
    func: () => unknown,
    error?: JestToErrorArg,
) {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    expect(func).toThrow(error);

    spy.mockRestore();
}
