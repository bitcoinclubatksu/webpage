import axios from 'axios';
import numeral from 'numeral';
const hostname = 'https://api.coincap.io';
const path = '/v2/assets/bitcoin';
const url = `${hostname+path}`;

describe('Bitcoin Club at KSU webpage', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	describe('navbar', function() {
		it('loads the logo image in nav', () => {
			cy.get('nav figure img')
				.should('be.visible')
				.and((img) => {
					expect(img[0].naturalWidth).to.equal(170);
					expect(img[0].naturalHeight).to.equal(170);
					expect(img[0].height).to.equal(80);
					expect(img[0].width).to.equal(80);
				});
		});

		it('has correct navigation for /about', () => {
			cy.get('nav a')
				.contains('about')
				.should('have.prop', 'href')
				.and('equal', 'https://owllife.kennesaw.edu/organization/bitcoinclub');
		});
	});

	describe('body', function() {
		it('loads the gradient image', () => {
			cy.get('div div main')
				.should((elem) => {
					expect(elem).to.have.css('background-image');
				})
				.invoke('css', 'background-image')
				.then(url => {
					url = (String(url.split('\"')[1]));
					cy.request(url)
						.then(response => {
							expect(response.status).to.eq(200);
						});
				});
		});

		describe('left div', function() {
			let volumeUSD, changePercent24, currentRate;
			beforeEach(async function() {
				const result = await axios.get(url);
				const data = result.data.data;
				volumeUSD = numeral(data.volumeUsd24Hr).format('($0.00a)');
				changePercent24 = parseFloat(data.changePercent24Hr).toFixed(2);
				currentRate = numeral(data.priceUsd).format('($0.00)');
			});

			it('loads the bitcoin spin logo', () => {
				cy.get('div div main div div #left figure img')
					.should('be.visible')
					.and((img) => {
						expect(img[0].naturalWidth).to.equal(800);
						expect(img[0].naturalHeight).to.equal(800);
						expect(img[0].height).to.equal(300);
						expect(img[0].width).to.equal(300);
					});
			});

			it('fetches and renders data from coincap API', () => {
				cy.get('#left h3 span')
					.eq(0)
					.should((elem) => {
						expect(elem.text().trim()).equal(currentRate);
					});

				cy.get('#left h3 span')
					.eq(1)
					.should((elem) => {
						expect(elem.text().trim()).equal(volumeUSD);
					});

				cy.get('#left h3 span')
					.eq(2)
					.should((elem) => {
						expect(elem.text().trim()).equal(changePercent24 + "%");
					});
			});

			describe('attempts fetch on mouseenter and touchstart events', function() {
				['mousenter', 'touchstart'].forEach((event) => {
					it.skip('should set image filter to grayscale if viewport is greater than 768', () => {
						cy.log('The event ${event} was fired');
						/* not possible to mimic as cy.hover() is
						 * not supported
						 */
					});

					it.skip('should set a spinner on price, volume and change', () => {
						cy.log('The event ${event} was fired');
						/* same as above */
					});
				});
			});
		});

		describe('right div', function() {
			it('should have a h1 heading titled \'Bitcoin Club at KSU\'', () => {
				cy.get('#right')
					.contains('h1', 'Bitcoin Club at KSU');
			});

		});
	});

	describe('footer', function() {
		it('should redirect to correct organization page', () => {
			cy.get('footer div p a')
				.eq(0)
				.should('have.prop', 'href')
				.and('equal', 'https://github.com/bitcoinclubatksu');
		});

		it('should redirect to intended maintainer\'s profile', () => {
			cy.get('footer div p a')
				.eq(1)
				.should('have.prop', 'href')
				.and('equal', 'https://github.com/harshitjoshi');

		});
	});
});
