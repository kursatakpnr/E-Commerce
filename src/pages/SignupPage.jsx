import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchRoles } from '../store/actions/clientActions';
import { signup } from '../mock/mockApi';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  // Redux'tan rolleri al
  const roles = useSelector((state) => state.client.roles);

  // Rolleri yükle (sadece gerektiğinde)
  useEffect(() => {
    if (roles.length === 0) {
      dispatch(fetchRoles());
    }
  }, [dispatch, roles.length]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role_id: '1' // Customer varsayılan olarak seçili
    }
  });

  const selectedRole = watch('role_id');
  const password = watch('password');
  const isStoreRole = selectedRole === '2';

  // Password validation regex - en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  // Türkiye telefon numarası regex
  const turkishPhoneRegex = /^(\+90|0)?[1-9][0-9]{9}$/;
  
  // Vergi numarası regex (TXXXXVXXXXXX)
  const taxIdRegex = /^T\d{4}V\d{6}$/;
  
  // Türk IBAN regex
  const ibanRegex = /^TR\d{2}\d{4}\d{4}\d{4}\d{4}\d{4}\d{2}$/;

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Veriyi role göre formatla
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

      // Mock API çağrısı
      const response = await signup(formData);
      
      if (response.success) {
        toast.success(response.message);
        // Önceki sayfaya yönlendir
        history.goBack();
      } else {
        toast.error(response.error || 'Kayıt sırasında bir hata oluştu');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Kayıt sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Hesap Oluştur
          </h1>
          <p className="text-gray-500">
            Bize katılın ve alışverişe hemen başlayın
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                Ad Soyad *
              </label>
              <input
                type="text"
                id="name"
                placeholder="Adınızı girin"
                className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('name', {
                  required: 'Ad gerekli',
                  minLength: {
                    value: 3,
                    message: 'Ad en az 3 karakter olmalı'
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
                E-posta *
              </label>
              <input
                type="email"
                id="email"
                placeholder="ornek@email.com"
                className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('email', {
                  required: 'E-posta gerekli',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Geçersiz e-posta adresi'
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
                Şifre *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Şifre girin"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('password', {
                    required: 'Şifre gerekli',
                    minLength: {
                      value: 8,
                      message: 'Şifre en az 8 karakter olmalı'
                    },
                    pattern: {
                      value: passwordRegex,
                      message: 'Şifre büyük harf, küçük harf, rakam ve özel karakter içermeli'
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
                Min 8 karakter, büyük harf, küçük harf, rakam ve özel karakter
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 mb-2">
                Şifre Tekrar *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Şifreyi tekrar girin"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors pr-12 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('confirmPassword', {
                    required: 'Şifre tekrarı gerekli',
                    validate: value => value === password || 'Şifreler eşleşmiyor'
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
                Rol *
              </label>
              <div className="relative">
                <select
                  id="role_id"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors appearance-none bg-white ${
                    errors.role_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('role_id', {
                    required: 'Rol seçimi gerekli'
                  })}
                >
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="1">Customer</option>
                      <option value="2">Store</option>
                      <option value="3">Admin</option>
                    </>
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
              {errors.role_id && (
                <p className="text-red-500 text-sm mt-1">{errors.role_id.message}</p>
              )}
            </div>

            {/* Store Fields - Sadece Store rolü seçildiğinde göster */}
            {isStoreRole && (
              <div className="space-y-5 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-slate-800">Mağaza Bilgileri</h3>
                
                {/* Store Name */}
                <div>
                  <label htmlFor="store_name" className="block text-sm font-bold text-slate-700 mb-2">
                    Mağaza Adı *
                  </label>
                  <input
                    type="text"
                    id="store_name"
                    placeholder="Mağaza adını girin"
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                      errors.store_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('store_name', {
                      required: isStoreRole ? 'Mağaza adı gerekli' : false,
                      minLength: {
                        value: 3,
                        message: 'Mağaza adı en az 3 karakter olmalı'
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
                    Mağaza Telefonu *
                  </label>
                  <input
                    type="tel"
                    id="store_phone"
                    placeholder="+90 5XX XXX XX XX"
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                      errors.store_phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('store_phone', {
                      required: isStoreRole ? 'Mağaza telefonu gerekli' : false,
                      pattern: {
                        value: turkishPhoneRegex,
                        message: 'Geçerli bir Türkiye telefon numarası girin'
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
                    Vergi Numarası *
                  </label>
                  <input
                    type="text"
                    id="store_tax_no"
                    placeholder="TXXXXVXXXXXX"
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                      errors.store_tax_no ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('store_tax_no', {
                      required: isStoreRole ? 'Vergi numarası gerekli' : false,
                      pattern: {
                        value: taxIdRegex,
                        message: 'Vergi numarası TXXXXVXXXXXX formatında olmalı'
                      }
                    })}
                  />
                  {errors.store_tax_no && (
                    <p className="text-red-500 text-sm mt-1">{errors.store_tax_no.message}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">Format: TXXXXVXXXXXX (X = rakam)</p>
                </div>

                {/* Store Bank Account (IBAN) */}
                <div>
                  <label htmlFor="store_bank_account" className="block text-sm font-bold text-slate-700 mb-2">
                    Banka Hesabı (IBAN) *
                  </label>
                  <input
                    type="text"
                    id="store_bank_account"
                    placeholder="TRXX XXXX XXXX XXXX XXXX XXXX XX"
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#23A6F0] transition-colors ${
                      errors.store_bank_account ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('store_bank_account', {
                      required: isStoreRole ? 'Banka hesabı gerekli' : false,
                      pattern: {
                        value: ibanRegex,
                        message: 'Geçerli bir Türk IBAN adresi girin'
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
                  Hesap Oluşturuluyor...
                </>
              ) : (
                'Kayıt Ol'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-500">
              Zaten hesabınız var mı?{' '}
              <Link to="/login" className="text-[#23A6F0] font-bold hover:underline">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
