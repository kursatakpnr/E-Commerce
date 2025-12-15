import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ChevronDown } from 'lucide-react';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock roles data (will be fetched from API later)
  const roles = [
    { id: 1, code: 'customer', name: 'Customer' },
    { id: 2, code: 'store', name: 'Store' },
    { id: 3, code: 'admin', name: 'Admin' }
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role_id: '1' // Customer selected by default
    }
  });

  const selectedRole = watch('role_id');
  const password = watch('password');
  const isStoreRole = selectedRole === '2';

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  // Turkish phone regex
  const turkishPhoneRegex = /^(\+90|0)?[1-9][0-9]{9}$/;
  
  // Tax ID regex (TXXXXVXXXXXX)
  const taxIdRegex = /^T\d{4}V\d{6}$/;
  
  // IBAN regex (Turkish IBAN)
  const ibanRegex = /^TR\d{2}\d{4}\d{4}\d{4}\d{4}\d{4}\d{2}$/;

  const onSubmit = (data) => {
    setIsLoading(true);
    
    // Format data based on role
    let formData;
    if (isStoreRole) {
      formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: parseInt(data.role_id),
        store: {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.store_tax_no,
          bank_account: data.store_bank_account
        }
      };
    } else {
      formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: parseInt(data.role_id)
      };
    }

    console.log('Form Data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Form submitted successfully! (Backend integration pending)');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500">
            Join us and start shopping today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters'
                  }
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@email.com"
                className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter password"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    },
                    pattern: {
                      value: passwordRegex,
                      message: 'Password must include uppercase, lowercase, number and special character'
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              <p className="text-gray-400 text-xs mt-1">
                Min 8 chars, uppercase, lowercase, number & special char
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Confirm password"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors pr-12 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role_id" className="block text-sm font-bold text-slate-700 mb-2">
                Role *
              </label>
              <div className="relative">
                <select
                  id="role_id"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors appearance-none bg-white ${
                    errors.role_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('role_id', {
                    required: 'Please select a role'
                  })}
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
              {errors.role_id && (
                <p className="text-red-500 text-sm mt-1">{errors.role_id.message}</p>
              )}
            </div>

            {/* Store Fields - Only shown when Store role is selected */}
            {isStoreRole && (
              <div className="space-y-5 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-slate-800">Store Information</h3>
                
                {/* Store Name */}
                <div>
                  <label htmlFor="store_name" className="block text-sm font-bold text-slate-700 mb-2">
                    Store Name *
                  </label>
                  <input
                    type="text"
                    id="store_name"
                    placeholder="Enter store name"
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                      errors.store_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('store_name', {
                      required: isStoreRole ? 'Store name is required' : false,
                      minLength: {
                        value: 3,
                        message: 'Store name must be at least 3 characters'
                      }
                    })}
                  />
                  {errors.store_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.store_name.message}</p>
                  )}
                </div>

                {/* Store Phone */}
                <div>
                  <label htmlFor="store_phone" className="block text-sm font-bold text-slate-700 mb-2">
                    Store Phone *
                  </label>
                  <input
                    type="tel"
                    id="store_phone"
                    placeholder="+90 5XX XXX XX XX"
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                      errors.store_phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('store_phone', {
                      required: isStoreRole ? 'Store phone is required' : false,
                      pattern: {
                        value: turkishPhoneRegex,
                        message: 'Please enter a valid Turkish phone number'
                      }
                    })}
                  />
                  {errors.store_phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.store_phone.message}</p>
                  )}
                </div>

                {/* Store Tax ID */}
                <div>
                  <label htmlFor="store_tax_no" className="block text-sm font-bold text-slate-700 mb-2">
                    Store Tax ID *
                  </label>
                  <input
                    type="text"
                    id="store_tax_no"
                    placeholder="TXXXXVXXXXXX"
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                      errors.store_tax_no ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('store_tax_no', {
                      required: isStoreRole ? 'Store Tax ID is required' : false,
                      pattern: {
                        value: taxIdRegex,
                        message: 'Tax ID must match pattern TXXXXVXXXXXX'
                      }
                    })}
                  />
                  {errors.store_tax_no && (
                    <p className="text-red-500 text-sm mt-1">{errors.store_tax_no.message}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">Format: TXXXXVXXXXXX (X = number)</p>
                </div>

                {/* Store Bank Account (IBAN) */}
                <div>
                  <label htmlFor="store_bank_account" className="block text-sm font-bold text-slate-700 mb-2">
                    Store Bank Account (IBAN) *
                  </label>
                  <input
                    type="text"
                    id="store_bank_account"
                    placeholder="TRXX XXXX XXXX XXXX XXXX XXXX XX"
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                      errors.store_bank_account ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('store_bank_account', {
                      required: isStoreRole ? 'Bank account is required' : false,
                      pattern: {
                        value: ibanRegex,
                        message: 'Please enter a valid Turkish IBAN'
                      }
                    })}
                  />
                  {errors.store_bank_account && (
                    <p className="text-red-500 text-sm mt-1">{errors.store_bank_account.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#23A6F0] text-white py-4 rounded font-bold text-sm hover:bg-[#1a8cd8] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-[#23A6F0] font-bold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
