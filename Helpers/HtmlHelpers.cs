using System.Collections.Generic;
using System.Web.Mvc;

namespace SheetMusic.Hepers
{
    public static class HtmlHelpers
    {
        public static IEnumerable<SelectListItem> MusicSheetKeys(this HtmlHelper hepler)
        {
            List<SelectListItem> keysList = new List<SelectListItem>()
            {
                new SelectListItem() { Text="C / Am", Value="C" },
                new SelectListItem() { Text="G / Em", Value="G" },
                new SelectListItem() { Text="D / Bm", Value="D" },
                new SelectListItem() { Text="A / F#m", Value="A" },
                new SelectListItem() { Text="E / C#m", Value="E" },
                new SelectListItem() { Text="B / G#m", Value="B" },
                new SelectListItem() { Text="F# / D#m", Value="F#" },
                new SelectListItem() { Text="C# / A#m", Value="C#" },
                new SelectListItem() { Text="F / Dm", Value="F" },
                new SelectListItem() { Text="Bb / Gm", Value="Bb" },
                new SelectListItem() { Text="Eb / Cm", Value="Eb" },
                new SelectListItem() { Text="Ab / Fm", Value="Ab" },
                new SelectListItem() { Text="Db / Bbm", Value="Db" },
                new SelectListItem() { Text="Gb / Ebm", Value="Gb" },
                new SelectListItem() { Text="Cb / Abm", Value="Cb" }
            };

            return keysList;
        }
    }
}