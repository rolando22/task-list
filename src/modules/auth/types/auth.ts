import { InferType } from 'yup';

import { LoginSchema } from '@/modules/auth/schemas';

export interface Login extends InferType<typeof LoginSchema> { }
