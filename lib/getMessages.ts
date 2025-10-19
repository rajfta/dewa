export async function getMessages(locale: string) {
    try {
        return (await import(`../messages/${locale}.json`)).default;
    } catch (_error) {
        // Fallback to Hungarian if locale not found
        return (await import(`../messages/hu.json`)).default;
    }
}
