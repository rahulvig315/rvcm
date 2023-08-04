import Image from 'next/image'

const logoOpts = {
  width: 400,
  height: 400,
  alt: 'Rahul Vig Logo',
  src: '/RVLogo.png',
  classes: 'p-5'
}

const wrapperClasses = "text-2xl md:text-4xl font-thin text-center"

function Logo() {
  return (
     <div className={wrapperClasses}>
        <Image src={logoOpts.src} width={logoOpts.width} height={logoOpts.height} alt={logoOpts.alt} className={logoOpts.classes} />
        <h1>Customer Manager</h1>
      </div>
  )
}

export default Logo