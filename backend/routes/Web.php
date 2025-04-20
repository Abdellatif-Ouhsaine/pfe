<?php
use App\Http\Middleware\Authenti_Dev;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeveloppeurController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\TacheController;



Route::get("/AjouterProjet", [ProjetController::class, "ajouterProjet"])->name("AjouterProjet");
Route::post("/EnregistrerProjet", [ProjetController::class, "enregistrerProjet"])->name("EnregistrerProjet");
Route::get("/AfficherProjet", [ProjetController::class, "afficherProjet"])->name("AfficherProjet");
Route::get("/ModifierProjet/{idP}", [ProjetController::class, "modifierProjet"])->name("ModifierProjet");
Route::put("/MettreAJourProjet/{idP}", [ProjetController::class, "mettreAjourProjet"])->name("MettreAJourProjet");
Route::get('/SupprimerProjet/{idP}', [ProjetController::class, "supprimerProjet"])->name("SupprimerProjet");






Route::get("/registre", [DeveloppeurController::class, "inscription"]);
Route::post("/registre/store", [DeveloppeurController::class, "registre"])->name("registre");
Route::get("/login", [DeveloppeurController::class, "login"])->name("login");
Route::post("/submit", [DeveloppeurController::class, "submit"])->name("submit");
Route::get("/logout", [DeveloppeurController::class, "logout"])->name("logout");

Route::get("/affichedeve", [DeveloppeurController::class, "affichedeve"])->name("AjouterDeveloppeur")->middleware(Authenti_Dev::class);;
Route::get("/AjouterDeveloppeur", [DeveloppeurController::class, "ajouterDeveloppeur"])->name("AjouterDeveloppeur");
Route::post("/EnregistrerDeveloppeur", [DeveloppeurController::class, "enregistrerDeveloppeur"])->name("EnregistrerDeveloppeur");
Route::get("/AfficherDeveloppeur", [DeveloppeurController::class, "afficherDeveloppeur"])->name("AfficherDeveloppeur");
Route::get("/ModifierDeveloppeur/{idDev}", [DeveloppeurController::class, "modifierDeveloppeur"])->name("ModifierDeveloppeur");
Route::put("/MettreAJourDeveloppeur/{idDev}", [DeveloppeurController::class, "mettreAJourDeveloppeur"])->name("MettreAJourDeveloppeur");
Route::get("/SupprimerDeveloppeur/{idDev}", [DeveloppeurController::class, "supprimerDeveloppeur"])->name("SupprimerDeveloppeur");






Route::get('AfficherDeveloppeur/hastach',[DeveloppeurController::class,'afficheDvBytach']) ;
Route::get('/tachefinis',[DeveloppeurController::class,'tachesfinis']) ;
Route::get('/projetencours',[DeveloppeurController::class,'projetencours']) ;
Route::get('/nbr_tache_encour ',[DeveloppeurController::class,'nbr_tache_encour']) ;
Route::get('/cout_total ',[DeveloppeurController::class,'cout_total']) ;
Route::get('/developpeurAvecCoutMax ',[DeveloppeurController::class,'developpeurAvecCoutMax']) ;


Route::get('/AjouterTache', [TacheController::class, 'ajouterTache'])->name('AjouterTache');
Route::post('/EnregistrerTache', [TacheController::class, 'enregistrerTache'])->name('EnregistrerTache');
Route::get('/AfficherTache', [TacheController::class, 'afficherTache'])->name('AfficherTache');
Route::get("/ModifierTache/{idT}", [TacheController::class, "modifierTache"])->name("ModifierTache");
Route::put("/MettreAjourTache/{idT}", [TacheController::class, "mettreAjourTache"])->name("MettreAjourTache");
Route::get("/SupprimerTache/{idT}", [TacheController::class, "supprimerTache"])->name("SupprimerTache");


Route::get("/RechercherParNomProjet", [ProjetController::class, 'rechercherParNomProjet'])->name("RechercherParNomProjet");
Route::post("/validerRechercher", [ProjetController::class, 'validerRechercher'])->name("ValiderRechercher");


Route::get("/RechercherParNomDev", [DeveloppeurController::class, 'rechercherParNomDev'])->name("RechercherParNomDev");
Route::post("/ValiderRechercherParNomDev", [DeveloppeurController::class, 'validerRechercherParNomDev'])->name("ValiderRechercherParNomDev");


Route::get("/RechercherParTache", [TacheController::class, 'rechercherParTache'])->name("RechercherParTache");
Route::post("/ValiderRechercherParTache", [TacheController::class, 'validerRechercherParTache'])->name("ValiderRechercherParTache");

Route::get("/AfficherProjetCout", [ProjetController::class, 'afficherProjetCout'])->name("AfficherProjetCout");

Route::get("/AfficherInfoDev", [DeveloppeurController::class, "afficherInfoDev"])->name("AfficherInfoDev");
Route::post("/ValiderAfficherInfoDev", [DeveloppeurController::class, "validerAfficherInfoDev"])->name("ValiderAfficherInfoDev");