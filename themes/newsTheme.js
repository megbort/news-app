/////////////////////////////////////////////
// Megan Krenbrink - App Dev 2 - Assign 01 //
/////////////////////////////////////////////

// Style js sheet

// theme pallet for newsTheme - and easy reference!
const themePalette ={
  primary:'#2B2D42',
  secondary: '#8D99AE',
  accent: '#D90429',
  light: '#EDF2F4'
}

// newTheme - items used as props with ThemeProvider
export const newsTheme = {  
  Button: {
      buttonStyle: {
          borderRadius: 20,
          marginTop: 5,
          color: themePalette.light,
          backgroundColor: themePalette.accent,
        },
      },
  Text: {
    style: {
      fontSize: 18,
      fontFamily: 'Arvin',
      marginBottom: 10,
    }
  }
};

