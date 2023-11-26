'use client';

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import ImageUploader from '../image-uploader/ImageUploader';
//import ProfileInformation from '../profile-information/ProfileInformation';
import PrimaryButton from '@/app/_components/PrimaryButton/PrimaryButton';
import { useCallback, useEffect, useState } from 'react';
//import StoreInformation from '../store-information/StoreInformation';
import { getProfile } from '../../_services/getProfile';
import { useUserInfo } from '@/app/_providers/UserInfoProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import {
  isValidPhoneNumber,
  isValidRequire,
  isValidStoreNumber,
} from '../../_utils/validate';
import { getMember } from '@/app/_services/member/getMember';
import { profileType } from '../../_types/profileType';
import ManageButton from '../manage-button/ManageButton';
import { patchProfile } from '../../_services/patchProfile';
import LocalStorage from '@/app/_utils/localstorage';
import { patchMember } from '@/app/_services/member/patchMember';
import LogoutButton from '@/app/_components/logout-button/LogoutButton';
import Spinner from '@/app/_components/spinner/Spinner';

const MyPageForm = () => {
  const [profile, setProfile] = useState<profileType>();

  const schema = object().shape({
    addressName: isValidRequire(),
    closeTime: isValidRequire(),
    image: isValidRequire(),
    name: isValidRequire(),
    openTime: isValidRequire(),
    storeNumber: isValidStoreNumber(),
    storeStatus: isValidRequire(),
    telephone: isValidStoreNumber(),
    userPhone: isValidPhoneNumber(),
    userName: isValidRequire(),
  });

  const methods = useForm<profileType>({
    resolver: yupResolver(schema),
  });
  const { storeId } = useUserInfo();

  const onSubmit: SubmitHandler<profileType> = data => {
    console.log('data = ', data);
  };

  const getData = useCallback(async () => {
    const res = await getProfile(storeId);
    const { nickName, phoneNumber, address } = await getMember();
    const data = {
      addressName: address.name,
      closeTime: res.closeTime,
      dayOff: res.dayOff,
      image: res.image,
      name: res.name,
      openTime: res.openTime,
      storeNumber: res.storeNumber,
      storeStatus: res.storeStatus,
      telephone: res.telephone,
      userPhone: phoneNumber,
      userName: nickName,
    };

    setProfile(data);
    LocalStorage.setItem('dealight-address', profile?.addressName);
  }, [profile, storeId]);

  const changeProfile = async () => {
    const { userPhone, telephone, dayOff } = methods.watch();
    const addressName = LocalStorage.getItem('dealight-address');
    const coords = LocalStorage.getItem('dealight-coords');

    const { address } = await getMember();

    await patchMember({
      req: {
        nickName: profile?.userName ?? '',
        phoneNumber: userPhone ?? profile?.userPhone,
        address: address ?? {
          name: addressName,
          xCoordinate: coords.lat,
          yCoordinate: coords.lng,
        },
      },
    });

    await patchProfile({
      req: {
        storeId: storeId ?? 1,
        telephone: telephone ?? profile?.telephone,
        addressName: addressName ?? profile?.addressName,
        xCoordinate: coords.lat,
        yCoordinate: coords.lng,
        openTime: '03:00:00', //openTime === closeTime ? profile?.openTime : openTime,
        closeTime: '06:00:00', //openTime === closeTime ? profile?.closeTime : closeTime,
        dayOff: !dayOff ? ['연중 무휴'] : dayOff,
      },
    });
  };

  useEffect(() => {
    if (storeId) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  console.log('profile = ', profile);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col px-5 pt-5">
          {profile ? (
            <>
              <ImageUploader storeImage={profile.image} />
            </>
          ) : (
            <div className="flex h-80 w-full items-center justify-center">
              <Spinner />
            </div>
          )}
          <PrimaryButton className="mb-5" type="submit" onClick={changeProfile}>
            정보 수정하기
          </PrimaryButton>
          <ManageButton />
          <LogoutButton />
        </div>
      </form>
    </FormProvider>
  );
};

export default MyPageForm;
