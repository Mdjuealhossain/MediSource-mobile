import { appendIfValid } from "./appendIfValid";

export const prepareFormData = (data) => {
    const formData = new FormData();
    const id = data.product_id;
    const qty = data.total_qty;
    const price = data.buying_price;

    console.log("data---", data);

    appendIfValid(formData, "order_date", data.date);
    appendIfValid(formData, "district_id", data.district_id);
    appendIfValid(formData, "area_id", data.area_id);
    appendIfValid(formData, "total_sale", data.total_amount);
    appendIfValid(formData, `buying_price[${id}]`, price);
    appendIfValid(formData, "product_ids[]", id);
    appendIfValid(formData, `quantities[${id}]`, qty);
    appendIfValid(formData, `product_type[${id}]`, data.product_type);
    appendIfValid(formData, "stock_item_amount", data.stock_item_amount);
    appendIfValid(formData, "short_item", data.short_item);
    appendIfValid(formData, "return", data.return);
    appendIfValid(formData, `is_dr[${id}]`, data.is_dr);
    appendIfValid(formData, `return_qty[${id}]`, data.return_qty);
    appendIfValid(formData, "total_delivery", data.total_delivery);
    appendIfValid(formData, "expense_amount", data.expense_amount);
    appendIfValid(formData, "expense_description", data.expense_description);
    appendIfValid(formData, `high_low[${id}]`, data.high_low);
    appendIfValid(formData, `extra_discount`, data.extra_discount);

    return formData;
};
