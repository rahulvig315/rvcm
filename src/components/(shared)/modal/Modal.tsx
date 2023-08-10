const classes = {
	header: 'w-full flex flex-col p-3 bg-[#132] font-thin justify-center text-lg items-center gap-2',
	body: 'w-full  border-[#132] border border-x flex  text-sm font-extralight bg-[#070707]',
	footer: 'w-full rounded flex p-3 bg-[#132] font-thin text-md justify-center gap-3',
};

export const ModalHeader = ({children, className = classes.header}: {children: React.ReactNode; className?: string}) => <section className={`${classes.header} ${className}`}>{children}</section>;
export const ModalBody = ({children, className = classes.body}: {children: React.ReactNode; className?: string}) => <section className={className}>{children}</section>;
export const ModalFooter = ({children, className = classes.footer}: {children: React.ReactNode; className?: string}) => <section className={className}>{children}</section>;

const modalClasses = {
	wrapper: 'absolute text-white bg-black/80 flex justify-center items-center top-0 w-full h-full',
	modal: ' w-1/2 flex flex-col bg-[#132] rounded',
	close: 'place-self-end  rounded-lg flex justify-center font-thin text-xs px-1 m-2',
};
export const Modal = ({children, show = false, setShow, classes = modalClasses}: {children?: React.ReactNode; show: boolean; setShow: (show: boolean) => void; classes?: typeof modalClasses}) => {
	if (!show) {
		return null;
	}

	return (
		<dialog className={classes.wrapper}>
			<main className={classes.modal}>
				<button className={classes.close} onClick={() => {
					setShow(false);
				}}>X</button>
				{children}
			</main>
		</dialog>);
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
