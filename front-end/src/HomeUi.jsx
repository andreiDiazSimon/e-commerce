import HPbg from './assets/home-page-background-image.png';
const HomeUi = () => {
	return (
		<div
			className=" text-white flex justify-start items-center w-full h-screen bg-cover bg-no-repeat bg-[center_left]"
			style={{
				backgroundImage: `url(${HPbg})`,
			}}
		>
			<div className='ml-[3rem] p-[2em] mb-[3rem] bg-[#0000006b] w-[40%] flex flex-col justify-center items-center gap-[1rem] '>
				<div className=' font-sans text-[3em] font-bold text-center'>Bridging skills to<br /> your service needs!</div>
				<div className='font-mono tracking-[.25em]'>Try it!</div>
				<div className='bg-[white] text-black p-[1rem] transition-all ease-in-out duration-[0.3s] hover:bg-[black] hover:text-[white] cursor-pointer'>HIRE NOW</div>
				<div>CLIENT ITO</div>
			</div>
		</div>
	);
};

export default HomeUi;
