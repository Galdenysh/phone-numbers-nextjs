import { IPhoneNumber } from "./types";

export function removeItem(arr: (IPhoneNumber | undefined)[], item: IPhoneNumber) {
  arr.forEach((el, index) => {
    if (el?.id === item.id) arr.splice(index, 1);
  });

  return arr;
}
