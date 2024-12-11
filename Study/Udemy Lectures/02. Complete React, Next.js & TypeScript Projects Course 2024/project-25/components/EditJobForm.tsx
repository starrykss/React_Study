'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from '@/utils/types';

import { getSingleJobAction, updateJobAction } from '@/utils/actions';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

import { CustomFormField, CustomFormSelect } from './FormComponents';

const EditJobForm = ({ jobId }: { jobId: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: '⚠️ There was an error.',
        });
        return;
      }
      toast({ description: '✅ Job updated.' });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });

      // /jobs 페이지로 이동
      router.push('/jobs');

      // 폼 초기화
      form.reset();
    },
  });

  // 1. 폼 정의하기
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  // 폼 제출 이벤트 처리
  const onSubmit = (values: CreateAndEditJobType) => {
    // Zod 라이브러리에 의해 여기의 모든 변수의 타입 안정성이 보장된다.
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'
      >
        <h2 className='capitalize font-semibold text-4xl mb-6'>edit job</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start'>
          <CustomFormField name='position' control={form.control} />
          <CustomFormField name='company' control={form.control} />
          <CustomFormField name='location' control={form.control} />

          <CustomFormSelect
            name='status'
            control={form.control}
            labelText='job status'
            items={Object.values(JobStatus)}
          />

          <CustomFormSelect
            name='mode'
            control={form.control}
            labelText='job mode'
            items={Object.values(JobMode)}
          />

          <Button
            type='submit'
            className='self-end capitalize'
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Edit Job'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditJobForm;
