'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { getOrg, updateOrg } from '@/lib/api/org';
import { orgProfileSchema, type OrgProfileFormData, INDIAN_STATES } from '@/lib/validators/org';
import { useAuthStore } from '@/stores/auth';

export function OrganizationProfileCard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = useAuthStore(state => state.token);
  const clearSession = useAuthStore(state => state.clearSession);

  const { data: orgData, isLoading, error } = useQuery({
    queryKey: ['org'],
    queryFn: () => getOrg(token!),
    enabled: !!token,
    retry: false,
  });

  // Handle query errors
  useEffect(() => {
    if (error) {
      if (error instanceof Error && error.message === 'UNAUTHORIZED') {
        clearSession();
        router.push('/login');
      } else {
        toast.error('Failed to load organization profile');
      }
    }
  }, [error, clearSession, router]);

  // Transform API data to form data (exclude createdAt, updatedAt)
  const formDefaultValues = orgData?.data ? {
    name: orgData.data.name,
    gstin: orgData.data.gstin,
    address1: orgData.data.address1,
    address2: orgData.data.address2 || '',
    city: orgData.data.city,
    state: orgData.data.state as typeof INDIAN_STATES[number],
    pin: orgData.data.pin,
    phone: orgData.data.phone || '',
    website: orgData.data.website || '',
  } : undefined;

  const form = useForm<OrgProfileFormData>({
    resolver: zodResolver(orgProfileSchema),
    defaultValues: formDefaultValues,
    values: formDefaultValues,
  });

 const { mutate, isPending } = useMutation({
  mutationFn: (data: OrgProfileFormData) => updateOrg(token!, data),
  onSuccess: (response) => {
    if (response.success) {
      toast.success('Organization profile updated.');
      queryClient.invalidateQueries({ queryKey: ['org'] });
      if (response.data) {
        form.reset({
          name: response.data.name,
          gstin: response.data.gstin,
          address1: response.data.address1,
          address2: response.data.address2 || '',
          city: response.data.city,
          state: response.data.state as typeof INDIAN_STATES[number],
          pin: response.data.pin,
          phone: response.data.phone || '',
          website: response.data.website || '',
        });
      }
    } else if (response.error) {
      handleError(response.error);
    }
  },
  onError: (error: Error) => {
    if (error.message === 'UNAUTHORIZED') {
      clearSession();
      router.push('/login');
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  },
});


  const handleError = (error: { code: string; message: string; field?: string }) => {
    if (error.code === 'VALIDATION_ERROR' && error.field) {
      form.setError(error.field as any, { message: error.message });
    } else {
      toast.error(error.message || 'Something went wrong. Please try again.');
    }
  };

  const onSubmit = (data: OrgProfileFormData) => {
    mutate(data);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const { isDirty, isValid } = form.formState;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Profile</CardTitle>
        <CardDescription>
          Update your organization details and billing address for GST compliance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Legal Entity Name *</Label>
            <Input
              id="name"
              {...form.register('name')}
              aria-describedby={form.formState.errors.name ? 'name-error' : undefined}
            />
            {form.formState.errors.name && (
              <p id="name-error" className="text-sm text-destructive mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="gstin">GSTIN *</Label>
            <Input
              id="gstin"
              {...form.register('gstin')}
              maxLength={15}
              className="uppercase"
              aria-describedby={form.formState.errors.gstin ? 'gstin-error' : undefined}
            />
            {form.formState.errors.gstin && (
              <p id="gstin-error" className="text-sm text-destructive mt-1">
                {form.formState.errors.gstin.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="address1">Registered Address *</Label>
            <Textarea
              id="address1"
              {...form.register('address1')}
              rows={3}
              aria-describedby={form.formState.errors.address1 ? 'address1-error' : undefined}
            />
            {form.formState.errors.address1 && (
              <p id="address1-error" className="text-sm text-destructive mt-1">
                {form.formState.errors.address1.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...form.register('city')}
                aria-describedby={form.formState.errors.city ? 'city-error' : undefined}
              />
              {form.formState.errors.city && (
                <p id="city-error" className="text-sm text-destructive mt-1">
                  {form.formState.errors.city.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="state">State *</Label>
              <Select
                value={form.watch('state')}
                onValueChange={(value) => form.setValue('state', value as typeof INDIAN_STATES[number], { shouldDirty: true })}
              >
                <SelectTrigger id="state" aria-describedby={form.formState.errors.state ? 'state-error' : undefined}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.state && (
                <p id="state-error" className="text-sm text-destructive mt-1">
                  {form.formState.errors.state.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="pin">PIN *</Label>
              <Input
                id="pin"
                {...form.register('pin')}
                maxLength={6}
                aria-describedby={form.formState.errors.pin ? 'pin-error' : undefined}
              />
              {form.formState.errors.pin && (
                <p id="pin-error" className="text-sm text-destructive mt-1">
                  {form.formState.errors.pin.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Contact Phone</Label>
            <Input
              id="phone"
              {...form.register('phone')}
              placeholder="+91-XXXXXXXXXX"
              aria-describedby={form.formState.errors.phone ? 'phone-error' : undefined}
            />
            {form.formState.errors.phone && (
              <p id="phone-error" className="text-sm text-destructive mt-1">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              {...form.register('website')}
              placeholder="https://"
              aria-describedby={form.formState.errors.website ? 'website-error' : undefined}
            />
            {form.formState.errors.website && (
              <p id="website-error" className="text-sm text-destructive mt-1">
                {form.formState.errors.website.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isDirty || !isValid || isPending}
            className="w-full md:w-auto"
          >
            {isPending ? 'Updating...' : 'Update Organization Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
