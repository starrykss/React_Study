import { createClient } from '@supabase/supabase-js';

// Supabase에서 설정한 버킷 이름 지정
const bucket = 'main-bucket';

// 클라이언트 생성하기
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

// 이미지 업로드하기
export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  // const newName = `/users/${timestamp}-${image.name}`;
  const newName = `${timestamp}-${image.name}`;

  // Supabase 버킷에 업로드하기
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: '3600',
    });

  if (!data) {
    throw new Error('⚠️ Image upload failed.');
  }

  // Supabase 버킷에 업로드 후, 공개 URL 값 가져와서 반환하기
  const imagePublicUrl = supabase.storage.from(bucket).getPublicUrl(newName)
    .data.publicUrl;

  return imagePublicUrl;
};

// 이미지 삭제
export const deleteImage = async (url: string) => {
  const imageName = url.split('/').pop();

  // 이미지가 없을 경우
  if (!imageName) {
    throw new Error('⚠️ Invalid URL.');
  }

  // Supbase Bucket에 있는 이미지 삭제하기
  return supabase.storage.from(bucket).remove([imageName]);
};
