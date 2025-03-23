export { formatNumber };

function formatNumber(number) {
    return (new Intl.NumberFormat("us-US", { style: "decimal" })).format(number);
}
