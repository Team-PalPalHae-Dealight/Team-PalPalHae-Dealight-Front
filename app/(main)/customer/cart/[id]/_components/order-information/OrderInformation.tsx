'use client';

import { useForm } from 'react-hook-form';
import { HOUR_LIST, MINUTE_LIST } from '../../_constants/time';
import { CartType } from '../../_types/CartType';
import { useUserInfo } from '@/app/_providers/UserInfoProvider';
import { sumTotalPrice } from '../../_utils/sumTotalPrice';

type InputType = {
  hour: string;
  minute: string;
  request: string;
};

type OrderInformationPropsType = {
  getInput: ({ hour, minute, request }: InputType) => void;
  data: CartType[] | undefined;
};

const OrderInformation = ({ getInput, data }: OrderInformationPropsType) => {
  const { register, watch } = useForm({});
  const { hour, minute, request } = watch();
  const { nickName } = useUserInfo();
  const total = sumTotalPrice({ data });

  getInput({ hour, minute, request });

  return (
    <>
      <div className="min-h-64 w-full rounded bg-white text-sm font-semibold text-black">
        <div className="p-4">
          <div className="pb-4 text-lg">주문 정보</div>
          <div className="flex justify-between pb-2.5 pr-5">
            <div>
              가게명 :{' '}
              <span className="font-normal text-dark-gray">
                {data ? data[0].storeName : null}
              </span>
            </div>
            <div>총 수량 : {total[1]} 개</div>
          </div>
          <div className="pb-2.5">
            상품명 :{' '}
            <span className="font-normal text-dark-gray">
              {data?.length === 1
                ? data[0].itemName
                : `${data ? data[0].itemName : null} 외 ${
                    data ? data.length - 1 : null
                  } 개`}
            </span>
          </div>
          <div className="pb-2.5">
            주문자 :{' '}
            <span className="font-normal text-dark-gray">{nickName}</span>
          </div>
          <div className="flex pb-2.5">
            도착 예정 시간 :{' '}
            <div className="flex justify-between pl-2 ">
              <div className="mr-3 border-1 border-solid border-dark-gray">
                <select
                  className="w-12 text-xs font-normal outline-none"
                  defaultValue=""
                  {...register('hour')}
                >
                  {HOUR_LIST.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              :
              <div className="ml-3 border-1 border-solid border-dark-gray">
                <select
                  className="w-12 text-xs font-normal"
                  defaultValue=""
                  {...register('minute')}
                >
                  {MINUTE_LIST.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex">
            <span>요청 사항 :</span>
            <input
              className="ml-2 min-h-[40px] flex-1 border-1 border-solid border-dark-gray p-1.5 text-xs font-normal outline-none"
              type="text"
              placeholder="(선택 사항) 요청사항을 작성해주세요"
              defaultValue=""
              {...register('request')}
            />
          </div>
        </div>
        <div className="flex h-12 w-full justify-between rounded-b bg-yellow px-4 leading-12">
          <div>총 금액 : </div>
          <div>{total[0]} 원</div>
        </div>
      </div>
    </>
  );
};

export default OrderInformation;
