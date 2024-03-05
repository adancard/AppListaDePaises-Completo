package br.com.spring.banco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.spring.banco.model.Pais;
import br.com.spring.banco.repository.PaisRepository;

@RestController
@RequestMapping("/pais")
public class PaisController {

	@Autowired
	private PaisRepository paisRepository;
	
	@GetMapping
	public Iterable<Pais> findAll(){
		return paisRepository.findAll();
	}
	
	@GetMapping("/nome/{nome}")
	public Iterable<Pais> findByNome(@PathVariable String nome){
		return paisRepository.findByNome(nome);
	}
	
	@GetMapping("/{id}")
	public Pais findById(@PathVariable Long id) {
		return paisRepository.findById(id).orElse(null);
	}
	
	@PostMapping
	public Pais createPais(@RequestBody Pais pais) {
		return paisRepository.save(pais);
	}
	
	@PutMapping("/{id}")
	public Pais updatePais(@PathVariable Long id, @RequestBody Pais pais) {
		pais.setId(id);
		return paisRepository.save(pais);
	}
	
	@DeleteMapping("{id}")
	public void deletePais(@PathVariable Long id) {
		paisRepository.deleteById(id);
	}
}
