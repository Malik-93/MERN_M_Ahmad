export const uniqueIdGenerator = () => {
    return new Date().getTime() + (Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000)
}
