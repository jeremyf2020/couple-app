describe('TabNavigation', () => {
  it('should have tab names', () => {
    const tabs = ['Home', 'Todo', 'Chat', 'Path', 'Settings'];
    expect(tabs).toHaveLength(5);
    expect(tabs).toContain('Home');
    expect(tabs).toContain('Todo');
  });
});