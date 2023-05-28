/// <reference types = "cypress" />
describe('template spec', () => {
  it('Api testing to IMG', () => {
    cy.request('GET', 'https://randomfox.ca/floof/').then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body).not.null
    })
  })
  it("Weather Api testing", ()=>{
    const req = {
      method : 'GET' , 
      url : 'https://api.openweathermap.org/data/2.5/weather' ,
      qs : {
        q : 'ankara' ,
        appid : '86d30bb57c3b71dd5211a01a1d9d07a5' ,
        units : 'metric' ,
        lang : 'tr'
      }
    }
  cy.request(req).then((response)=>{
    expect(response.status).to.equal(200)
    expect(response.body).not.null
  })
  })
  it('Degistir Button image Function Test' , ()=>{
    let imageID;
    cy.visit('http://localhost:3000/')
    cy.request('GET' ,'https://randomfox.ca/floof').then((response)=>{
      imageID = response.body.image
      cy.get('.MuiPaper-root > :nth-child(2) > .MuiButtonBase-root').click()
      cy.request('GET', 'https://randomfox.ca/floof').then((response2)=>{
        expect(response2.body.image).not.equal(imageID)
      })
    })
  })
  it('Degistir Button content function test' , ()=>{
      let previousContentAuthor;
      let previousContentQuote;
      cy.visit('http://localhost:3000/')
      cy.request('GET' , 'https://api.themotivate365.com/stoic-quote').then((response)=>{
        expect(response.status).to.equal(200)
        expect(response.body).not.null
        previousContentAuthor = response.body.author
        previousContentQuote = response.body.quote
        cy.get(':nth-child(4) > .MuiButtonBase-root').click()
        cy.request('GET' , 'https://api.themotivate365.com/stoic-quote').then((response2)=>{
          expect(response2.body.author).not.equal(previousContentAuthor)
          expect(response2.body.quote).not.equal(previousContentQuote)
        })
      })
  })
})