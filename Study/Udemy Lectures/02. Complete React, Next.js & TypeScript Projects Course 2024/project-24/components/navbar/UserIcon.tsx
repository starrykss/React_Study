import { LuUser2 } from 'react-icons/lu';
import { currentUser, auth } from '@clerk/nextjs/server';

const UserIcon = async () => {
  // clerk를 통해 인증 정보를 가져온다.
  const user = await currentUser();

  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <img
        src={profileImage}
        className="w-6 h-6 rounded-full object-cover"
        alt="profile"
      />
    );
  }

  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
};

export default UserIcon;
