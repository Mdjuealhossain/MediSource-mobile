import { appendIfValid } from "./appendIfValid";

export const prepareFormData = (data) => {
    const formData = new FormData();
    const id = data.product_id;
    const qty = data.total_qty;
    const price = data.buying_price;

    appendIfValid(formData, "order_date", data.date);
    appendIfValid(formData, "district_id", data.district_id);
    appendIfValid(formData, "total_sale", data.total_amount);
    appendIfValid(formData, `buying_price[${id}]`, price);
    appendIfValid(formData, "product_ids[]", id);
    appendIfValid(formData, `quantities[${id}]`, qty);
    appendIfValid(formData, `product_type[${id}]`, data.product_type);
    appendIfValid(formData, "stock_item_amount", "10");
    appendIfValid(formData, "short_item", "0");
    appendIfValid(formData, "return", "0");
    appendIfValid(formData, `is_dr[${id}]`, data.is_dr);
    appendIfValid(formData, `return_qty[${id}]`, data.return_qty);
    appendIfValid(formData, "total_delivery", "10");
    appendIfValid(formData, "expense_amount", "0");
    appendIfValid(formData, "expense_description", "");
    appendIfValid(formData, `high_low[${id}]`, data.high_low);

    return formData;
};
