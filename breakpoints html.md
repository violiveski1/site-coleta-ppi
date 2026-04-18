Breakpoints para aplicações web

Estruturas de Media Queries (Mobile-First)

/* --- Extra Small (padrão) --- */
/* Dispositivos < 576px. Não precisa de media query. */
body {
  background-color: white;
  font-size: 14px;
}

/* --- Small (sm) --- */
@media (min-width: 576px) {
  /* Ex: Smartphones em modo paisagem */
  body {
    font-size: 16px;
  }
}

/* --- Medium (md) --- */
@media (min-width: 768px) {
  /* Ex: Tablets (iPad) */
  .container {
    width: 720px;
  }
}

/* --- Large (lg) --- */
@media (min-width: 992px) {
  /* Ex: Laptops pequenos */
  .menu-lateral {
    display: block;
  }
}

/* --- Extra Large (xl) --- */
@media (min-width: 1200px) {
  /* Ex: Desktops comuns */
  .hero-image {
    height: 500px;
  }
}

/* --- Extra Extra Large (xxl) --- */
@media (min-width: 1400px) {
  /* Ex: Monitores de alta resolução */
  .container {
    max-width: 1320px;
  }
}


/* Tabela de Breakpoints */

Breakpoint            Dimensões       Exemplos de dispositivos
------------------------------------------------------------
Extra small (xs)      < 576px         Smartphones em modo retrato:
                                      iPhone 13/14/15, Samsung Galaxy S23,
                                      Google Pixel

Small (sm)            ≥ 576px         Smartphones grandes em modo paisagem
                                      ou modelos Max/Plus

Medium (md)           ≥ 768px         Tablets pequenos:
                                      iPad Mini, Galaxy Tab, Kindle

Large (lg)            ≥ 992px         Tablets grandes ou laptops pequenos:
                                      iPad Pro, Surface, Chromebooks

Extra large (xl)      ≥ 1200px        Laptops e desktops:
                                      MacBook Air/Pro, monitores Full HD

Extra extra large     ≥ 1400px        Monitores grandes:
(xxl)                                 24"+, 4K, ultrawide


/ * Meta viewport necessária */


<!-- <!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
</html> -->
