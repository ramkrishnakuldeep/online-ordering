export const getFormattedNumber = (num: number) => {
    return new Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(num)
}