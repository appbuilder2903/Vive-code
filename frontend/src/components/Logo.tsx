interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

export function Logo({ className = '', size = 'md', withText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img
        src="/logo.svg"
        alt="Vive Code Logo"
        className={`${sizeClasses[size]} dark:hidden`}
      />
      <img
        src="/logo-dark.svg"
        alt="Vive Code Logo"
        className={`${sizeClasses[size]} hidden dark:block`}
      />
      {withText && (
        <span className={`${textSizeClasses[size]} font-bold text-gray-900 dark:text-white`}>
          Vive Code
        </span>
      )}
    </div>
  );
}
