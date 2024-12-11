'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField, CustomFormSelect } from './FormComponents';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJobAction } from '@/utils/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const CreateJobForm = () => {
  // 폼 정의하기
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      // 데이터가 없을 경우
      if (!data) {
        toast({
          description: '⚠️ There was an error.',
        });
        return;
      }

      toast({ description: '✅ Job created.' });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      // /jobs 페이지로 이동
      router.push('/jobs');

      // 폼 초기화
      form.reset();
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    // 폼에서 입력된 값 처리
    // Zod 라이브러리에 의해 모든 변수들의 타입 안정성이 보장된다.
    // console.log(values);
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'
      >
        <h2 className='capitalize font-semibold text-4xl mb-6'>Add Job</h2>
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
            {isPending ? 'Loading...' : 'Create Job'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
