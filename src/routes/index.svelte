<style>

	h1, h3, figure {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		margin: 0;
		--size: 4.5rem;
		--size-t: 4rem;
		--size-m: 2.5rem;
		line-height: 1.01em;
		letter-spacing: -.049375rem;
		font-size: var(--size);
		font-weight: 700;
	}

    p {
        color: rgb(110, 120, 152);
        font-size: 24px;
        font-weight: normal;
        /*letter-spacing: -0.2px;*/
        line-height: 32px;
    }

    figcaption {
        color: rgb(110, 120, 152);
        font-size: 12px;
    }

    #left {
        box-shadow: 2px 20px 50px 0 rgba(0,0,0,.07);
        border-radius: 18px;
        min-width: 363px;
    }
    
    #right {
        box-shadow: 2px 20px 50px 0 rgba(0,0,0,.07);
        border-radius: 18px;
    }

    #change {
        color: var(--color);
		display: initial;
    }

    .gradient {
        font-weight: 500;
        background: linear-gradient(153deg,#f98e00,#ffbc00);
        -webkit-background-clip: text;
        color: transparent;
        display: inline-block;
    }

    .spin {
		width: 300px;
        height: 300px;
        /*margin-top: -93px;*/
	    -webkit-filter: grayscale(0);
	    filter: grayscale(0) blur(0);
	    -webkit-transition: .3s ease-in-out;
	    transition: .3s ease-in-out;
    }

    .spin:hover {
    	-webkit-filter: grayscale(100%) blur(2px);
    	filter: grayscale(100%) blur(2px);
    }

</style>

<script>
    import { onMount } from 'svelte';
	import numeral from 'numeral';
	import cssVars from 'svelte-css-vars';
    import getBTCPrice from './_btc.js';
    import Icon from 'svelte-awesome';
    import { faCog } from '@fortawesome/free-solid-svg-icons';

    let volumeUSD = "...waiting",
	 changePercent24 = "...waiting",
	 currentRate = "...waiting",
	 isPositiveChange;

    async function fetchPrice() {
		let data = await getBTCPrice();
		volumeUSD = numeral(data.volumeUsd24Hr).format('($0.00a)');
		changePercent24 = parseFloat(data.changePercent24Hr).toFixed(2);
        currentRate = numeral(data.priceUsd).format('($0.00)');
        isPositiveChange = (changePercent24 < 0) ? false : true;
    }

    function waiting() {
        volumeUSD = "...waiting";
	    changePercent24 = "...waiting";
	    currentRate = "...waiting";
    }
    
    onMount(async () => {
        await fetchPrice();
    });

    $: percentChange = {
        color: isPositiveChange ? 'green' : 'red'
    };

</script>

<svelte:head>
	<title>Bitcoin Club at KSU</title>
</svelte:head>

<div class="container m-3">
    <div class="row justify-content-center">
       
		<div class="col-3-auto d-flex flex-column justify-content-center m-3 p-2 bg-white" id="left">
		    <figure class="flex-row col flex-grow-0 align-content-center p-2" on:mouseenter={waiting} on:touchstart={waiting} on:mouseleave={async () => {await fetchPrice();}} on:touchend={async () => {await fetchPrice();}}>
		    	<img class="spin" alt='Bitcoin Club' src='bitcoin_shine.gif'/>
                <figcaption>Hover or click over the image to update.</figcaption>
		    </figure>
		    	<h3 class="flex-row col flex-grow-0 align-content-center p-2">Price: {currentRate}</h3>
		    	<h3 class="flex-row col flex-grow-0 align-content-center p-2 ">Volume(24Hr): {volumeUSD}</h3>
		    	<h3 class="flex-row col flex-grow-0 align-content-center p-2 ">Change(24Hr): <div id="change" use:cssVars="{percentChange}">{changePercent24}%</div></h3>
    	</div>
        
        
        <div class="col-md-7 d-flex flex-column justify-content-center p-2 m-3 bg-white" id="right">
            <h1 class="flex-row col flex-grow-0 align-content-center py-5">
		        Bitcoin Club at KSU
            </h1>
		    <p class="flex-row p-2 flex-grow-0 align-items-center text-center">We strive to promote currently emerging innovations related to the digital economy. The mindset of this organization as a whole is to gain knowledge and help build skillset to appreciate the digital economy technologies. We wish to share and promote digital economy solutions through collaborative and peer learning efforts. The mission of this organization is to help students understand and develop an appreciation for <span class="gradient">cryptocurrencies, cryptography, security, privacy,</span> and <span class="gradient">the digital economy.</span></p><p class="p-2 flex-row align-items-center"><Icon data={faCog} spin/><small>&nbsp; We are currently working on updating the website meanwhile check out the About section!</small></p>
		</div>
    </div>
</div>
